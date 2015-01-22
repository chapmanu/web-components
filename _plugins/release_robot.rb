require 'colorize'

class ReleaseRobot

  def welcome
    print_monogram
    robot_says "Hi, I am the web-components release robot!\nLets walk you through the release processes."
    puts
  end

  def prompt(phrase)
    print phrase.bold
    STDIN.gets.strip
  end

  def inform(phrase)
    puts "    #{phrase}".colorize(:green)
  end

  def up_to_date?
    was_good = system('git remote -v update')
    if (was_good)
      puts "Was good!"
    else
      puts "Was bad"
    end
  end

  private

  def robot_says(phrase)
    lines = phrase.split("\n").reverse!
    robot_text = File.read('_plugins/robot.txt')
    [34, 15].each_with_index do | spot_to_put_line, index |
      break unless lines[index]
      robot_text[spot_to_put_line] = lines[index].bold
    end
    puts robot_text
  end

  def print_monogram
    puts File.read('_plugins/cu_ascii.txt').colorize(:red)
  end
end