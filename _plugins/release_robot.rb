require 'colorize'
require 'json'

class ReleaseRobot

  def initialize(bower_file)
    @bower_file      = nil
    @current_version = nil
    @next_version    = nil
    @commit_message  = nil
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
    puts "  #{phrase}".colorize(:green)
  end

  def inform_print(phrase)
    print phrase.colorize(:green)
  end

  def branch_up_to_date?
    `git remote update`
    !!(`git status -uno` =~ /(up-to-date|branch is ahead)/)
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
    inform "updating bower.json to version #{@current_version.bold}"
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
    puts File.read('_plugins/cu_ascii.txt').colorize(:red)
  end

  def parse_bower
    @bower_file = JSON.parse(File.read('bower.json'))
  end
end