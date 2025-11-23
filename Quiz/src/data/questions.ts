export interface Question {
    id: number;
    question: string;
    options: string[];
    answer: string;
}

export const questions: Question[] = [
    {
        id: 1,
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        answer: "Paris",
    },
    {
        id: 2,
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Venus"],
        answer: "Mars",
    },
    {
        id: 3,
        question: "Who wrote 'Romeo and Juliet'?",
        options: ["Charles Dickens", "William Shakespeare", "Mark Twain", "Jane Austen"],
        answer: "William Shakespeare",
    },
    {
        id: 4,
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        answer: "Pacific Ocean",
    },
    {
        id: 5,
        question: "What is the chemical symbol for Gold?",
        options: ["Au", "Ag", "Fe", "Pb"],
        answer: "Au",
    },
    {
        id: 6,
        question: "In which year did the Titanic sink?",
        options: ["1905", "1912", "1918", "1923"],
        answer: "1912",
    },
    {
        id: 7,
        question: "Which element has the atomic number 1?",
        options: ["Helium", "Oxygen", "Hydrogen", "Carbon"],
        answer: "Hydrogen",
    },
    {
        id: 8,
        question: "What is the hardest natural substance on Earth?",
        options: ["Gold", "Iron", "Diamond", "Platinum"],
        answer: "Diamond",
    },
    {
        id: 9,
        question: "Who painted the Mona Lisa?",
        options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"],
        answer: "Leonardo da Vinci",
    },
    {
        id: 10,
        question: "What is the speed of light?",
        options: ["299,792 km/s", "150,000 km/s", "1,080 km/h", "Sound speed"],
        answer: "299,792 km/s",
    },
];
