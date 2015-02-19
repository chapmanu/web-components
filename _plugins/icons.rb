require 'json'

icons = []
Dir.glob('_assets/images/icons/*.svg') do |icon_file|
  icons.push({
        "name"=> File.basename(icon_file, ".*"),
        "name_ext"=> File.basename(icon_file),
        "path"=> File.dirname(icon_file),
        "ext"=> File.extname(icon_file),
        "rel_path" => 'icons/' + File.basename(icon_file)
    })
end

File.open("_data/icons.json","w") do |icons_temp|
  icons_temp.write(JSON.pretty_generate(icons))
end