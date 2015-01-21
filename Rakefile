require 'json'

task :default do
	puts "hello world!"
end

task :release do
	bower = JSON.parse(File.read('bower.json'))
	old_version = bower["version"]
	version = bower["version"].split('.').map(&:to_i)
	# Depending on release type, bump various numbers
	# version[0]
	# version[1]
	version[2] += 1

	bower["version"] = version.join('.')
	File.write('bower.json', JSON.pretty_generate(bower))
	puts "version has been bumped from #{old_version} to #{bower["version"]}"

	print "Please enter your release commit message: "
	commit_message = STDIN.gets.strip
	git_command = "git commit -am \"#{commit_message}\""
	puts `#{git_command}`
end