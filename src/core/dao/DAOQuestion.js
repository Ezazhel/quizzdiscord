import { Question } from "../models/Question";
import uuid from "react-uuid";
export const QUESTIONS = "questions";

export const importQuestionsForTheme = (JSONStringQuestion) => {
    let questions = JSON.parse(localStorage.getItem(QUESTIONS)) ?? {};
    Object.keys(questions).map((index) => {
        questions[index].id = uuid();
        let newQuestion = new Question({
            ...questions[index],
        });
        questions = {
            ...questions,
            [newQuestion.themeId]: {
                ...questions[newQuestion.themeId],
                [newQuestion.id]: newQuestion,
            },
        };
    });
    localStorage.setItem(QUESTIONS, JSON.stringify(questions));
};

export const insertUpdateQuestion = (questionObject) => {
    let questions = JSON.parse(localStorage.getItem(QUESTIONS)) ?? {};
    questionObject.id = questionObject?.id ?? uuid();
    let newQuestion = new Question({
        ...questionObject,
    });
    questions = {
        ...questions,
        [newQuestion.themeId]: {
            ...questions[newQuestion.themeId],
            [newQuestion.id]: newQuestion,
        },
    };
    localStorage.setItem(QUESTIONS, JSON.stringify(questions));
};

export const getQuestionByTheme = (themeId) => {
    let allQuestions = JSON.parse(localStorage.getItem(QUESTIONS)) ?? {};
    return Object.keys(allQuestions[themeId] ?? {}).map(
        (id) => allQuestions[themeId][id]
    );
};

export const deleteQuestionOfTheme = (deletedQuestion) => {
    let { themeId, id: questionId } = deletedQuestion;
    let allQuestions = JSON.parse(localStorage.getItem(QUESTIONS));
    delete allQuestions[themeId][questionId];
    localStorage.setItem(QUESTIONS, JSON.stringify(allQuestions));
};

export const deleteAllQuestionOfTheme = (idTheme) => {
    let allQuestions = JSON.parse(localStorage.getItem(QUESTIONS));
    delete allQuestions[idTheme];
    localStorage.setItem(QUESTIONS, JSON.stringify(allQuestions));
};
