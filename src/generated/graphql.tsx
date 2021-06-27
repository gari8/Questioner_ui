export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Upload: any;
};

export type Answer = {
  __typename?: 'Answer';
  id: Scalars['Int'];
  user: User;
  question: Question;
  content?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['String']>;
};

export enum AnswerType {
  Free = 'free',
  Select = 'select',
  Word = 'word',
  Photo = 'photo'
}

export type Choice = {
  __typename?: 'Choice';
  id: Scalars['Int'];
  content: Scalars['String'];
  value: Scalars['Int'];
  question: Question;
};

export type ChoiceInput = {
  content: Scalars['String'];
};

export type EditQuestion = {
  title: Scalars['String'];
  content: Scalars['String'];
  answerType: AnswerType;
  termStart: Scalars['String'];
  termEnd: Scalars['String'];
  published: Scalars['Boolean'];
  enabled: Scalars['Boolean'];
};

export type EditUser = {
  id: Scalars['ID'];
  username: Scalars['String'];
  email: Scalars['String'];
  icon?: Maybe<Scalars['Upload']>;
  description: Scalars['String'];
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser: User;
  createSession: Scalars['String'];
  editUser: User;
  editPassword: Scalars['Boolean'];
  createQuestion: Question;
  editQuestion: Scalars['Boolean'];
  createAnswer: Scalars['Boolean'];
};


export type MutationCreateUserArgs = {
  input: NewUser;
};


export type MutationCreateSessionArgs = {
  input?: Maybe<LoginInput>;
};


export type MutationEditUserArgs = {
  input: EditUser;
};


export type MutationEditPasswordArgs = {
  id: Scalars['ID'];
  password: Scalars['String'];
};


export type MutationCreateQuestionArgs = {
  input: NewQuestion;
};


export type MutationEditQuestionArgs = {
  input: EditQuestion;
};


export type MutationCreateAnswerArgs = {
  input: NewAnswer;
};

export type NewAnswer = {
  userId: Scalars['ID'];
  value?: Maybe<Scalars['String']>;
  file?: Maybe<Scalars['Upload']>;
  questionId: Scalars['ID'];
  answerType: AnswerType;
  choiceId?: Maybe<Scalars['Int']>;
};

export type NewQuestion = {
  userId: Scalars['ID'];
  title: Scalars['String'];
  content: Scalars['String'];
  answerType: AnswerType;
  termStart?: Maybe<Scalars['String']>;
  termEnd?: Maybe<Scalars['String']>;
  published: Scalars['Boolean'];
  enabled: Scalars['Boolean'];
  textAfterAnswered?: Maybe<Scalars['String']>;
  choices?: Maybe<Array<ChoiceInput>>;
};

export type NewUser = {
  username: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
};

export type Node = {
  id: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  users: Array<User>;
  findUser: User;
  confirmToken: User;
  questions: Array<Question>;
  findQuestion: Question;
  findAnswer: Answer;
};


export type QueryUsersArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type QueryFindUserArgs = {
  id: Scalars['ID'];
};


export type QueryQuestionsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type QueryFindQuestionArgs = {
  id: Scalars['ID'];
  userId: Maybe<Scalars['ID']>
};


export type QueryFindAnswerArgs = {
  id: Scalars['ID'];
};

export type Question = Node & {
  __typename?: 'Question';
  id: Scalars['ID'];
  title: Scalars['String'];
  answerCount: Scalars['Int'];
  answers?: Maybe<Array<Answer>>;
  content?: Maybe<Scalars['String']>;
  termStart?: Maybe<Scalars['String']>;
  termEnd?: Maybe<Scalars['String']>;
  textAfterAnswered?: Maybe<Scalars['String']>;
  published: Scalars['Boolean'];
  enabled: Scalars['Boolean'];
  answerType: Scalars['String'];
  choices?: Maybe<Array<Choice>>;
  answered: Scalars['Boolean'];
  user: User;
  answerers?: Maybe<Array<User>>;
  created_at?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['String']>;
};


export type User = Node & {
  __typename?: 'User';
  id: Scalars['ID'];
  username: Scalars['String'];
  icon?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  questionCount?: Maybe<Scalars['Int']>;
  answerCount?: Maybe<Scalars['Int']>;
  answers?: Maybe<Array<Answer>>;
  questions?: Maybe<Array<Question>>;
  created_at?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['String']>;
};
