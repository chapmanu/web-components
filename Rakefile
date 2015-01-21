require 'json'

#########################
# ::: CONFIGURATION ::: #
#########################


task :release do
	# Get the release commit message
	print "Please enter your release commit message: "
	commit_message = STDIN.gets.strip

	# Copy the assets into the dist folder
	FileUtils.rm_r('dist')
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
	git_commit = "git commit -am \"#{commit_message}\""
	git_add = "git add ."
	puts `#{git_add}`
	puts `#{git_commit}`
end