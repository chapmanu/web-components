require 'json'
require './_plugins/release_robot.rb'

#########################
# ::: CONFIGURATION ::: #
#########################

task :serve do
  exec("bundle exec guard")
end


task :release do
  begin
  bot = ReleaseRobot.new 'bower.json'
  
  # Welcome!
  bot.welcome

  # Checks for uncommitted changes
  bot.inform "Checking for any uncommitted changes..."
  if bot.nothing_to_commit?
    bot.inform "All changes committed :)"
  else
    bot.inform "You have uncommitted changes.  Please commit them first, then run `rake release` again."
    next
  end

  # Checks if your Branch is up to date
  bot.inform "Checking if your branch is up-to-date with the remote..."
  if bot.branch_up_to_date?
    bot.inform "Cool. Everything is up to date."
  else
    bot.inform "Uh oh. Your branch is behind the remote."
    should_pull = bot.prompt "Would you like to run git pull? (Y/n) "
    
    # Checks if you want to pull the remote branch
    if should_pull.downcase == 'y'
      bot.pull
      bot.pull_tags
    else
      bot.inform "Please pull the changes, then run `rake release` again"
    end
    next
  end

  # Ask for the new version number for this release
  release_type_key = bot.prompt "What type of release is this?\n1) Major\n2) Minor\n3) Patch\nSelect number 1, 2 or 3: "
  bot.commit_message = bot.prompt "Commit message for this release: "

  release_type_map = {"1" => "major", "2" => "minor", "3" => "patch"}
  bot.bump_version(release_type_map[release_type_key])
    
  # Confirm you want these changes to take place
  if bot.you_sure?
    bot.build
    bot.update_dist
    bot.update_bower_file
    bot.commit
    bot.tag
    bot.push
    bot.push_tags
    # bot.push_gh_pages
  else
     bot.inform "Ok, not gonna do anything then..."
  end

  # Goodbye
  bot.all_done

  rescue Interrupt => e
    puts "Release Cancelled"
  end
end