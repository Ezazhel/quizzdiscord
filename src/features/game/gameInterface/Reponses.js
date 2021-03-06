import React, { useState } from "react";
import styled from "styled-components";
import { Button, Col } from "react-bootstrap";

const CONTAINER_RESPONSE = styled.div`
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(40%, 1fr));
    grid-auto-rows: 1fr;
    padding: 40px;
`;
const BUTTON_RESPONSE = styled(Button)`
    height: auto;
    min-height: 100px;
    min-width: 33%;
    font-size: 1.5rem;
`;

const getBadReponse = (autreReponses) => {
    return [autreReponses.split(";")[0]];
};
const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const CashReponses = (props) => {
    let [isAnswered, setIsAnswered] = useState(false);

    const revealAnswer = (e) => {
        const bonneReponse = e.target.dataset.bonneReponse === "true";
        setIsAnswered(true);
        setTimeout(() => props.answer(bonneReponse), 1000);
    };
    return (
        <div className="d-flex flex-column">
            <div className="d-flex justify-content-around">
                <BUTTON_RESPONSE
                    variant="outline-success"
                    data-bonne-reponse={true}
                    onClick={revealAnswer}
                >
                    Oui
                </BUTTON_RESPONSE>
                <BUTTON_RESPONSE
                    variant="outline-danger"
                    data-bonne-reponse={false}
                    onClick={revealAnswer}
                >
                    Non
                </BUTTON_RESPONSE>
            </div>
            {isAnswered && props.bonneReponse && (
                <div className="m-2 text-center">
                    <h1>{props.bonneReponse}</h1>
                </div>
            )}
        </div>
    );
};

class DuoCarreReponses extends React.Component {
    constructor(props) {
        super();
        let arrayToShuffle =
            props.mode.name === "duo"
                ? getBadReponse(props.question.autreReponses)
                : props.question.autreReponses.split(";");
        this.state = {
            isAnswered: false,
            Reponses: shuffle([props.question.bonneReponse, ...arrayToShuffle]),
        };
    }

    revealAnswer = (e) => {
        const bonneReponse = e.target.dataset.bonneReponse === "true";
        this.setState(
            {
                isAnswered: true,
            },
            () => {
                setTimeout(() => this.props.answer(bonneReponse), 1000);
            }
        );
    };
    setVariantButtonOnAnswered(reponse) {
        return this.state.isAnswered
            ? reponse === this.props.question?.bonneReponse ?? false
                ? "success"
                : "danger"
            : "outline-light";
    }
    render() {
        return this.state.Reponses.map((v) => (
            <BUTTON_RESPONSE
                key={v}
                variant={this.setVariantButtonOnAnswered(v)}
                data-bonne-reponse={
                    v === this.props?.question?.bonneReponse ?? false
                }
                onClick={this.revealAnswer}
            >
                {v}
            </BUTTON_RESPONSE>
        ));
    }
}

export default (props) => {
    return (
        <CONTAINER_RESPONSE>
            {props.mode !== null && props.mode.name !== "cash" ? (
                <DuoCarreReponses
                    mode={props.mode}
                    answer={props.answer}
                    question={props.question}
                />
            ) : (
                <CashReponses
                    answer={props.answer}
                    bonneReponse={props.question?.bonneReponse}
                />
            )}
        </CONTAINER_RESPONSE>
    );
};
