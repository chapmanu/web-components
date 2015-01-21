require 'json'

#########################
# ::: CONFIGURATION ::: #
#########################

task :release do
	# First git pull
	git_pull = "git pull --tags"
	puts `#{git_pull}`

	# Get the release commit message
	print "Please enter your release commit message: "
	commit_message = STDIN.gets.strip

	# Copy the assets into the dist folder
	FileUtils.rm_r('dist', force: true)
	FileUtils.cp_r('_site/assets/.', 'dist')

	# Get the version from the bower.json File
	bower = JSON.parse(File.read('bower.json'))
	old_version = bower["version"]
	version = bower["version"].split('.').map(&:to_i)
	
	# Bump the version (TODO MORE ON THIS LATER)
	version[2] += 1
	bower["version"] = version.join('.')
	
	# Write back to the bower.json file
	File.write('bower.json', JSON.pretty_generate(bower))
	puts "version has been bumped from #{old_version} to #{bower["version"]}"
	
	# Run the git commands
	git_add = "git add ."
	git_commit = "git commit -am \"#{commit_message}\""
	puts `#{git_add}`
	puts `#{git_commit}`

	# Tag it with the version
	git_tag = "git tag -a v#{bower["version"]} -m '#{commit_message}'"
	puts `#{git_tag}`

	# Ask if they want to push to github
	print "Would you like to push your commits to git github? (Y/n)"
	answer = STDIN.gets.strip.downcase
	if answer == 'y'
		puts `git push --tags`
	end
	puts "All done :)"
end