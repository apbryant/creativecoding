from math import sin, pi
from shapely import LineString
import vsketch

class MyProjectSketch(vsketch.SketchClass):
    WIDTH = vsketch.Param(20.32)
    HEIGHT = vsketch.Param(29.21)

    def draw(self, vsk: vsketch.Vsketch) -> None:
        vsk.size("a4", landscape=False)
        vsk.scale("cm")
        width = self.WIDTH
        height = self.HEIGHT
        buffer = width * 0.05
        j = buffer
        while j < height - buffer:           
            with vsk.pushMatrix(): 
                coordinates = []
                offset = vsk.map(vsk.noise(j), 0, 1, 0, 0.5)
                vsk.translate(offset, 0)
                i = buffer

                while i < width - buffer:
                    x = i
                    a = vsk.map(vsk.noise(i, j), 0, 1, 3, 10)
                    b = 1
                    k = vsk.map(vsk.noise(i, j), 0, 1, 0.04, 0.1)
                    # The curve on line 31 started from the sinc impulse function by Iñigo Quilez
                    # https://iquilezles.org/articles/functions/
                    # MIT License
                    y = j + sin(pi * a * -b) * k
                    coordinates.append((x, y))
                    i_increment = width * 0.01
                    i += i_increment
                line_string = LineString(coordinates)
                vsk.geometry(line_string)
            j_increment = height * 0.001
            j += j_increment
            
    def finalize(self, vsk: vsketch.Vsketch) -> None:
        vsk.vpype("linemerge linesimplify reloop linesort")


if __name__ == "__main__":
    MyProjectSketch.display()
