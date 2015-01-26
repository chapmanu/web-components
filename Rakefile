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
  Dir.mktmpdir do |tmp|
    cp_r "_site/.", tmp
    
    pwd = Dir.pwd
    Dir.chdir tmp

    system "git init"
    system "git add ."
    message = "Site updated at #{Time.now.utc}"
    system "git commit -m  #{message.inspect}"
    system "git remote add origin git@github.com:#{GITHUB_REPONAME}.git"
    system "git push origin master:refs/heads/gh-pages --force"

    Dir.chdir pwd
  end
end

desc "Serve the site locally for development"
task :serve do
  exec("bundle exec guard")
end


task :release do
  begin
  ReleaseRobot.new.release!
  rescue Interrupt => e
    puts "Release Cancelled"
  end
end