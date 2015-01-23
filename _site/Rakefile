require 'json'
require './_plugins/release_robot.rb'

#########################
# ::: CONFIGURATION ::: #
#########################

task :release do
  # Print the ascii art!
  bot = ReleaseRobot.new 'bower.json'
  bot.welcome

  bot.inform_print "Checking if your branch is up-to-date with the remote..."
  if bot.branch_up_to_date?
    bot.inform_print "it is!\n"
  else
    bot.inform_print "it is not.\n"
    should_pull = bot.prompt "Would you like to run git pull? (Y/n) "
    if should_pull.downcase == 'y'
      bot.pull
      bot.pull_tags
    else
      bot.inform "You will need to pull before we can continue."
    end
    next
  end

  release_type_key = bot.prompt "What type of release is this?\n1) Major\n2) Minor\n3) Patch\nSelect number 1, 2 or 3: "
  bot.commit_message = bot.prompt "Commit message for this release: "

  release_type_map = {"1" => "major", "2" => "minor", "3" => "patch"}
  bot.bump_version(release_type_map[release_type_key])
  
  if bot.you_sure?
    bot.build
    bot.update_dist
    bot.update_bower_file
    bot.commit
    bot.tag
    bot.push
    bot.push_tags
  else
     bot.inform "Ok, not gonna do anything then..."
  end

  bot.all_done
end