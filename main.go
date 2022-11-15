package main

import (
	"embed"
	"fmt"
	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"contentConverter/backend/transcode"

	// "path/filepath"
	// "os"
	// "golang.org/x/sys/windows" 
)

//go:embed all:frontend/dist
//go:embed icon.jpeg
var assets embed.FS

func main() {
	// homeDir, err := os.UserHomeDir()
	// handleErr(err)
	// inFilePath  := filepath.Join(homeDir, "AtnumStatic", "ffmpeg.exe")
	// mod, err  := windows.LoadDLL(inFilePath)
	// fmt.Printf("%#v\n", mod)
	// handleErr(err)
	gicon, _ := assets.ReadFile("icon.jpeg")
	// Create an instance of the app structure
	services := &transcode.Services{}
	services.GIcon = gicon

	// Create application with options
	err := wails.Run(&options.App{
		Title:            "atnum-content-converter",
		Width:            640,
		Height:           384,
		Assets:           assets,
		BackgroundColour: &options.RGBA{R: 254, G: 254, B: 254, A: 1},
		OnStartup:        services.Startup,
		Bind: []interface{}{
			services,
		},
	})

	if err != nil {
		println("Error:", err.Error())
	}
}


func handleErr(err error) {
	if err != nil {
		fmt.Printf("%s\n", err)
	}
}
