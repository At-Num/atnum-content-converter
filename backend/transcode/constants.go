package transcode
import (
	"context" 
	"fmt"
	"encoding/base64"
	"os"
)

type Services struct { 
   Ctx   context.Context
   GIcon []byte

}

func (cli *Services) Startup(ctx context.Context) {
	cli.Ctx = ctx
}

func (cli *Services) GetGicon() string  {
	return  base64.StdEncoding.EncodeToString(cli.GIcon)
}

func (cli *Services) ShutDown()  {
	os.Exit(1)
}


func handleErr(err error) {
	if err != nil {
		fmt.Printf("%s\n", err)
	}
}


