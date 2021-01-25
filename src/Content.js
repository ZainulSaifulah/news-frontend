import React from 'react';
import { Card, Row, Col, Container } from 'react-bootstrap';

class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            news: [],
        }
    }

    componentDidMount() {
        if (this.props.country) {
            fetch(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=2e2e276acd444b4cacce4769c94604b9`)
            .then(news => news.json())
            .then(json => this.setState({ news: json.articles }))
        } else {
            fetch('https://newsapi.org/v2/top-headlines?country=id&apiKey=2e2e276acd444b4cacce4769c94604b9')
                .then(news => news.json())
                .then(json => this.setState({ news: json.articles }))
        }

    }


    componentDidUpdate(prevProps, prevState) {
        if (this.props.query !== prevProps.query) {
            fetch(`https://newsapi.org/v2/everything?q=${this.props.query}&apiKey=2e2e276acd444b4cacce4769c94604b9`)
            .then(news => news.json())
            .then(json => this.setState({ news: json.articles }))
        } 
    }
    

    loopRender() {
        let row = []

        if (this.state.news.length !== 0) {
            this.state.news.map(article => {
                row.push(
                    <Col md={3}>
                        <Card>
                        <Card.Img width="auto" height="160px" variant="top" src={article.urlToImage} />
                        <Card.Body>
                            <Card.Title>{article.title}</Card.Title>
                            <Card.Text>
                            {article.description}
                            </Card.Text>
                            <Card.Link href={article.url} target="_blank">Detail</Card.Link>
                        </Card.Body>
                        </Card>
                    </Col>
                )
            })
        }

        return row
    }


    
    render() {
        return (
            <Container>
                <Row>
                    {this.loopRender()}
                </Row>
            </Container>
        )
    }
}

export default Content