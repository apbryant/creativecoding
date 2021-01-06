using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClearDownloadsFolder
{
    class Program
    {
        const string Downloads = @"C:\Users\Andrew\Downloads";
        const string OldDownloads = @"C:\Old Downloads";

        static void Main(string[] args)
        {
            CopyFiles();
        }

        private static void CopyFiles()
        {
            string month = DateTime.Today.ToString("MMMM");
            string year = DateTime.Today.ToString("yyyy");
            string folderName = month + " " + year;
            if (Directory.EnumerateFileSystemEntries(Downloads).Any())
            {
                string newDownloadsFolder = Path.Combine(OldDownloads, folderName);
                if (!Directory.Exists(newDownloadsFolder))
                {
                    Directory.CreateDirectory(newDownloadsFolder);
                }
                foreach (string file in Directory.GetFiles(Downloads))
                {
                    string oldFilePath = Path.GetFullPath(file);            
                    string newFilePath = Path.Combine(newDownloadsFolder, Path.GetFileName(file));
                    if (!File.Exists(newFilePath))
                    {
                        File.Move(oldFilePath, newFilePath);
                    }                  
                }
                foreach (string dir in Directory.GetDirectories(Downloads))
                {
                    string newDirPath=Path.Combine(newDownloadsFolder,dir.Split('\\').Last());
                    if (!Directory.Exists(newDirPath))
                    {
                        Directory.Move(dir, newDirPath);
                    }                   
                }
            }
        }
    }
}
