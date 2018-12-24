import React, { Component } from 'react';

class MemeGenerator extends Component {
    state = {
            topText: '',
            bottomText: '',
            randomImage: 'http://i.imgflip.com/1bij.jpg',
            allMemeImgs: []
    }

    componentDidMount() {
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(response => {
                const {memes} = response.data;
                this.setState({
                    allMemeImgs: memes
                });
            })

    }

    handleChange = (e) => {
        const {name, value} = e.target;
        this.setState({
            [name]: value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const random = Math.floor(Math.random() * this.state.allMemeImgs.length);
        const randomMeme = this.state.allMemeImgs[random].url;
        this.setState({
            randomImage: randomMeme
        });
    }

    render() {
        return (
            <div className="memes">
                <form onSubmit={this.handleSubmit} className="meme-form">
                    <button type="submit" className="generate">New Image</button>
                    <input 
                        name="topText" 
                        type="text"
                        placeholder="Top Text"
                        value={this.state.topText}
                        onChange={this.handleChange}
                    />
                    <input 
                        name="bottomText" 
                        type="text"
                        placeholder="Bottom Text"
                        value={this.state.bottomText}
                        onChange={this.handleChange}
                    />
                </form>
                <div className="meme">
                    <img width ="600px" src={this.state.randomImage}/>
                    <h2 className="text top-text"> {this.state.topText}</h2>
                    <h2 className="text bottom-text">{this.state.bottomText}</h2>
                </div>
            </div>
        );
    }
}

export default MemeGenerator;