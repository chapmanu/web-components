=begin
# Open the directory with the icons
files = OpenDirectory("_assets/images/icons")

icons = []

# Loop through the files and save to array
files.each do |icon_file|
    icons.push({
        "name": icon_file.file_name,
        "path": icon_file.file_path
        "ext" : icon_file.file_ext
    })
end


# Write the array to the _data/icons file
File.write('_data/icons.json', JSON.pretty_generate(icons))


{% foreach icon in site.data.icons %}
=end