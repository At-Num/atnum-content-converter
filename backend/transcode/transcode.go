package transcode

import (
	"os"
	"os/exec"
	"fmt"
	"path/filepath"
	"strings"
	"sync"
)

func (cli *Services) Debug( mssg string) {
	fmt.Printf("%s\n", mssg)
}

func (cli *Services) TranscodeAVIToMp4( fileName string) string {
	
	var wg sync.WaitGroup
	ret := "false"
	wg.Add(1)
	homeDir, err := os.UserHomeDir()
	handleErr(err)
	inFilePath  := filepath.Join(homeDir, "AtnumStatic", fileName)
	fmt.Println(inFilePath)
 
	outFilePath := strings.TrimSuffix(fileName, filepath.Ext(fileName))
	outFilePath = fmt.Sprintf("%s.%s",outFilePath, "mp4")
	outFile  := filepath.Join(homeDir, "AtnumStatic", outFilePath)
	fmt.Println("out path ", outFile)
	
	if chekIfMp4FileExists(outFilePath) {
		return "exists"
	}
	exePath  := filepath.Join(homeDir, "AtnumStatic", "bin", "ffmpeg")
	cmd := exec.Command( exePath,  `-i`, inFilePath, `-c:v`, `libx265`, outFile )
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr

    go func() {
		defer wg.Done()
		err = cmd.Start()
		handleErr(err)
		if err == nil {
			ret = "true"
		}
 
	}()

	wg.Wait()
	fmt.Println("completes")
    return ret
}

func chekIfMp4FileExists(filename string) bool {
    info, err := os.Stat(filename)
    if os.IsNotExist(err) {
        return false
    }
    return !info.IsDir()
}
