import React from 'react';
import ReactDOM from 'react-dom';
import Dropzone from 'react-dropzone';
import request from 'superagent';

/*----config
    accepted mime-types
    maximum File size in bytes
    file name prefix
------------*/
/**
A file upload box to allow uploading files
*/
class FileInput extends React.Component {
    constructor() {
        super();
        this.state = {status: 0, progress: 0, filePath: ''}; //status 0: start, 1: uploading, 2: uploaded
    }
    getRandomNumber() {
        return Math.round(+new Date() / 1000);
    }
    getFormatFromName(name) {
        let tmp = name.split('.');
        return tmp[tmp.length - 1];
    }
    onDrop(files) {
        let self = this;
        let filePrefixName = this.props.config && this.props.config.fileNamePrefix ? this.props.config.fileNamePrefix : 'file';
        let req, fname;
        files.forEach((file)=> {
            fname = filePrefixName + this.getRandomNumber() + '.' + this.getFormatFromName(file.name);
            req = request.post('/upload/' +encodeURIComponent(fname));
            req.attach(fname, file);
        });

        req.on('progress', function(e) {
            //console.log('Percentage done: ', e.percent);
            self.setState({status: 1, progress: e.percent});
        }).end((err,res)=> {
            //console.log(err,res);
            let filePath = window.location.protocol+'//'+window.location.hostname+(window.location.port ? ':'+window.location.port: '') + '/uploaded/'+ fname;
            self.setState({status: 2, progress: 100, filePath: filePath});
            self.props.onDataEdit(filePath);
        });

    }

    render() {
        let dropzoneRef;
        let acceptedMimeTypes = this.props.config && this.props.config.acceptedMimeTypes ? this.props.config.acceptedMimeTypes : '';
        let maxFileSize = this.props.config && this.props.config.maxFileSize ? Number(this.props.config.maxFileSize) : 157286400; //150MB default
        return (
            <div ref="fileInput">
                {!this.state.status ?
                    <div className="dropzone">
                        <Dropzone style={{'width': '100%', 'height': '200px', borderWidth: '2px', borderStyle: 'dashed', borderRadius: '5px'}} ref={(node) => { dropzoneRef = node; }} accept={acceptedMimeTypes} maxSize={maxFileSize} multiple={false} onDrop={this.onDrop.bind(this)}>
                            <p>Drop your file here</p>
                        </Dropzone> or
                        &nbsp;<button className="ui button" type="button" onClick={() => { dropzoneRef.open() }}>
                        Browse and select a file
                        </button>
                    </div>
                    :null
                }
                {this.state.status === 1 ?
                    <div className="progress">
                        <div className="ui active inline loader"></div> {this.state.progress}% uploaded. Waiting for the next action to start...
                    </div>
                    :null
                }
                {this.state.status === 2 ?
                    <div className="uploaded">
                        File was successfully uploaded at <a href={this.state.filePath}>{this.state.filePath}</a>.
                    </div>
                    :null
                }
            </div>
        );
    }
}

export default FileInput;
