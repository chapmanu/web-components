require 'json'
require './_plugins/release_robot.rb'
require 'tmpdir'
require 'jekyll'
require 'bundler/setup'

#########################
# ::: CONFIGURATION ::: #
#########################

GITHUB_REPONAME = 'chapmanu/web-components'

desc "Generate the website with jekyll"
task :generate do
  Jekyll::Site.new(Jekyll.configuration({
    "source"      => ".",
    "destination" => "_site"
  })).process
end

desc "Publish this local version of the site to github pages"
task :publish => [:generate] do
end

desc "Serve the site locally for development"
task :serve do
  exec("bundle exec guard")
end


task :release do
  begin
  ReleaseRobot.new.release!
  rescue Interrupt => e
    puts "\nRelease Cancelled"
  end
end