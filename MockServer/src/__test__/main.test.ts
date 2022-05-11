import request from 'supertest';
import { app } from '../index'
jest.mock("axios", () => ({
    __esModule: true,
    default: {
        get: jest.fn().mockImplementation(() => {

            const response = {
                data: [
                    {
                        id: '88e40f63-f6a3-41df-99ef-4bc7d6591194',
                        title: 'hero',
                        description: 'nothing',
                        createdAt: '2022-05-10T05:45:47.431Z',
                        authId: '6a042ead-6d1a-4eca-8a92-4a99280060d7'
                    }
                ]
            }

            return Promise.resolve(response);
        }),
        post: jest.fn().mockImplementation((url: any) => {
            if (url === "http://localhost:3011/review/list") {
                const reviews =

                {
                    data: {
                        '88e40f63-f6a3-41df-99ef-4bc7d6591194': [
                            {
                                review: 'good',
                                createdAt: '2022-05-10T05:46:42.334Z',
                                id: '971777a5-c75b-4605-ab21-ea1795dd1968',
                                userId: '6a042ead-6d1a-4eca-8a92-4a99280060d7',
                                bookId: '88e40f63-f6a3-41df-99ef-4bc7d6591194',
                                
                            },
                            {
                                review: 'nyc',
                                createdAt: '2022-05-10T05:46:53.001Z',
                                id: '8c0a9408-99b7-4f1a-8b39-7860d16eb370',
                                userId: '6a042ead-6d1a-4eca-8a92-4a99280060d7',
                                bookId: '88e40f63-f6a3-41df-99ef-4bc7d6591194',
                               
                            }
                        ]
                    }

                }

                return Promise.resolve(reviews)
            }
            if (url === "http://localhost:3011/user/list") {
                return Promise.resolve({
                    data: [
                        {
                            "name": "aayush",
                            "emailId": "aayush@gmail.com",
                            "password": "12345678",
                            "id": "6a042ead-6d1a-4eca-8a92-4a99280060d7"
                        }
                    ],
                });
            }
        }),
    },
}));

describe("getFeed", () => {
    test("should return feed", async () => {
        let result: any = await request(app.callback()).get("/").set('Authorization', 'bearer 123');
        const data =
            [
                {
                    "bookInfo": {
                        "authId": "6a042ead-6d1a-4eca-8a92-4a99280060d7",
                        "createdAt": "2022-05-10T05:45:47.431Z",
                        "description": "nothing",
                        "id": "88e40f63-f6a3-41df-99ef-4bc7d6591194",
                        "title": "hero"
                    },
                    "reviews": [
                        {
                            "bookId": "88e40f63-f6a3-41df-99ef-4bc7d6591194",
                            "createdAt": "2022-05-10T05:46:42.334Z",
                            "id": "971777a5-c75b-4605-ab21-ea1795dd1968",
                            "review": "good",
                            "reviewerInfo": {
                                "emailId": "aayush@gmail.com",
                                "id": "6a042ead-6d1a-4eca-8a92-4a99280060d7",
                                "name": "aayush"
                            },
                            "userId": "6a042ead-6d1a-4eca-8a92-4a99280060d7"
                        },
                        {
                            "bookId": "88e40f63-f6a3-41df-99ef-4bc7d6591194",
                            "createdAt": "2022-05-10T05:46:53.001Z",
                            "id": "8c0a9408-99b7-4f1a-8b39-7860d16eb370",
                            "review": "nyc",
                            "reviewerInfo": {
                                "emailId": "aayush@gmail.com",
                                "id": "6a042ead-6d1a-4eca-8a92-4a99280060d7",
                                "name": "aayush"
                            },
                            "userId": "6a042ead-6d1a-4eca-8a92-4a99280060d7"
                        }
                    ],
                    "userInfo": {
                        "emailId": "aayush@gmail.com",
                        "id": "6a042ead-6d1a-4eca-8a92-4a99280060d7",
                        "name": "aayush"
                    }
                }
            ]

        result = JSON.parse(result.text)
        expect(result).toEqual(data)
    });
});