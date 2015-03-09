require './_plugins/release_robot.rb'
require 'jekyll'

#################
# ::: TASKS ::: #
#################

desc "Serve the site locally for development"
task :serve do
  exec("bundle exec guard")
end

desc "Generate the website with jekyll"
task :generate do
  Jekyll::Site.new(Jekyll.configuration({
    "source"      => ".",
    "destination" => "_site"
  })).process
end

desc "Publish this local version of the site to github pages"
task :publish => [:generate] do
  ReleaseRobot.new.publish!
end

desc "Release a new bower version of the assets"
task :release => [:generate] do
  begin
  ReleaseRobot.new.release!
  rescue Interrupt => e
    puts "\nRelease Cancelled"
  end
end