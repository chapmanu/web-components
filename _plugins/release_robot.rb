require 'colorize'
require 'json'

class ReleaseRobot

  @@release_type_map = {"1" => "major", "2" => "minor", "3" => "patch"}

  def initialize()
    @bower_file      = nil
    @current_version = nil
    @next_version    = nil
    @commit_message  = nil
  end

  def release!
    welcome
    return if uncommitted_changes?

    if branch_behind_remote? && want_to_pull?
      pull && pull_tags
    else
      inform "Please pull the changes, then run `rake release` again"
      return
    end

    get_release_message
    get_release_version_type
      
    if you_sure?
      build
      update_dist
      update_bower_file
      commit
      tag
      push
      push_tags
      # push_gh_pages
    else
       bot.inform "Ok, not gonna do anything then..."
    end

    all_done
  end

  def get_release_version_type
    @release_type_key = prompt "What type of release is this?\n1) Major\n2) Minor\n3) Patch\nSelect number 1, 2 or 3: "
    bump_version(@@release_type_map[@release_type_key])
  end

  def get_release_message
    @commit_message = prompt "Commit message for this release: "
  end

  def want_to_pull?
    should_pull = prompt "Would you like to run `git pull` and `git pull --tags`? (Y/n) "
    should_pull.downcase == 'y'
  end

  def uncommitted_changes?
    inform "Checking for any uncommitted changes..."
    if nothing_to_commit?
      inform "All changes committed :)"
      false
    else
      inform "You have uncommitted changes.  Please commit them first, then run `rake release` again."
      true
    end
  end

  def commit_message=(message)
    @commit_message = message
  end

  def welcome
    print_monogram
    robot_says "Hi, I am the web-components release robot!\nLets walk you through the release processes."
    puts
  end

  def prompt(phrase)
    print phrase
    STDIN.gets.strip
  end

  def inform(phrase)
    puts "#{phrase}".blue
  end

  def branch_behind_remote?
    inform "Checking if your branch is up-to-date with the remote..."

    system "git remote update"
    up_to_date = !!(`git status -uno` =~ /(up-to-date|branch is ahead)/)

    if up_to_date
      inform "Cool. Everything is up to date."
      true
    else
      inform "Uh oh. Your branch is behind the remote."
      inform "You will need to 'git pull' and 'git pull --tags'"
      false
    end
  end

  def nothing_to_commit?
    !!(cmd("git status") =~ /nothing to commit/)
  end

  def pull
    inform "Running git pull"
    puts `git pull`
  end

  def pull_tags
    inform "Running git pull --tags"
    puts `git pull --tags`
  end

  def build
    inform "Running jekyll build"
    `jekyll build`
  end

  def update_dist
    inform "Copying _sites/assets into dist"
    FileUtils.rm_r('dist', force: true)
    FileUtils.cp_r('_site/assets/.', 'dist')
  end

  def update_bower_file
    raise "NeedTheNextVersionNumber" if @next_version == nil
    inform "Updating bower.json to version #{@current_version.bold}"
    @bower_file["version"] = @next_version
    File.write('bower.json', JSON.pretty_generate(@bower_file))
  end

  def commit
    inform "Running git add ."
    `git add .`
    inform "Running git commit -am \"#{@commit_message}\""
    `git commit -am "#{@commit_message}"`
  end

  def tag
    inform "Running git tag -a v#{@next_version}"
    `git tag -a v#{@next_version} -m "#{@commit_message}"`
  end

  def push
    inform "Running git push"
    `git push`
  end

  def push_tags
    inform "Running git push --tags"
    `git push --tags`
  end

  def bump_version(version_bump_type)
    parse_bower
    @current_version = @bower_file["version"]
    versions = @current_version.split('.').map(&:to_i)
    
    case version_bump_type
    when "patch"
      versions[2] += 1
    when "minor"
      versions[1] += 1
      versions[2] = 0
    when "major"
      versions[0] += 1
      versions[1] = 0
      versions[2] = 0
    else
      raise "UnknownVersionType"
    end
    @next_version = versions.join('.')
  end

  def you_sure?
    robot_says "Please confirm that you want me to do the following:"
    warn "1. Run a fresh build of the assets"
    warn "2. Update the dist folder with compiled assets"
    warn "3. Change version in bower.json from #{@current_version.bold} to #{@next_version.bold.colorize(:white)}"
    warn "4. Commit all local changes with this message: #{@commit_message.bold.colorize(:white)}"
    warn "5. Tag this commit with v#{@next_version.bold}"
    warn "4. Push all changes and tags to remote branch"
    # warn "5. Push a copy of this branch to github pages to be hosted"
    answer = prompt "Does this sound agreeable to you? (Y/n) "
    answer.downcase == 'y'
  end

  def warn(phrase)
    puts phrase.colorize(:yellow)
  end

  def all_done
    robot_says "All done :) Thanks for contributing!"
  end

  private

  def robot_says(phrase)
    lines = phrase.split("\n").reverse!
    robot_text = File.read('_plugins/robot.txt')
    [34, 15].each_with_index do | spot_to_put_line, index |
      break unless lines[index]
      robot_text[spot_to_put_line] = lines[index].bold
    end
    puts robot_text
  end

  def print_monogram
    puts File.read('_plugins/title.txt')
  end

  def parse_bower
    @bower_file = JSON.parse(File.read('bower.json'))
  end

  def cmd(system_command)
    `#{system_command}`.blue
  end
end