package transcode

import (
	"os"
	"fmt"
	"path/filepath"
	"strings"
	"sync"
	ffmpeg "github.com/u2takey/ffmpeg-go"
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
	if chekIfMp4FileExists(outFilePath) {
		return "exists"
	}
    go func() {
		defer wg.Done()
		err = ffmpeg.Input(inFilePath).
		Output(filepath.Join(homeDir, "AtnumStatic", outFilePath), ffmpeg.KwArgs{
			"format": "mp4",
		}).Run()
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
