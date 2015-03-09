require './_plugins/release_robot.rb'
require 'jekyll'

#################
# ::: TASKS ::: #
#################

desc "Serve the site locally for development"
task :serve do
  exec("bundle exec guard")
end

desc "Publish this local version of the site to github pages"
task :publish do
  ReleaseRobot.new.publish!
end

desc "Release a new bower version of the assets"
task :release do
  begin
  ReleaseRobot.new.release!
  ReleaseRobot.new.publish!
  rescue Interrupt => e
    puts "\nRelease Cancelled"
  end
end