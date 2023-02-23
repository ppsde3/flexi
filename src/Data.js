let data = [
  {
    id: "1",
    body: "First comment",
    username: "Flexi",
    userId: "1",
    parentId: null,
    upVoteCount: 0,
    createdAt: "2021-08-16T23:00:33.010+02:00",
  },
  {
    id: "2",
    body: "Second comment",
    username: "Ple",
    userId: "2",
    parentId: null,
    upVoteCount: 0,
    createdAt: "2021-08-16T23:00:33.010+02:00",
  },
  {
    id: "3",
    body: "First comment first child",
    username: "Flexiple",
    userId: "2",
    parentId: "1",
    upVoteCount: 0,
    createdAt: "2021-08-16T23:00:33.010+02:00",
  },
  {
    id: "4",
    body: "Second comment second child",
    username: "Plefexi",
    userId: "2",
    parentId: "2",
    upVoteCount: 0,
    createdAt: "2021-08-16T23:00:33.010+02:00",
  },
];

export const getComments = async () => {
  return data;
};

export const createComment = async (text, parentId = null) => {
  return {
    id: Math.random().toString(36).substr(2, 9),
    body: text,
    parentId,
    userId: "1",
    username: "Flexiple",
    createdAt: new Date().toISOString(),
  };
};

export const updateComment = async (text) => {
  return { text };
};

export const deleteComment = async () => {
  return {};
};

export const upVoteCount = async (commentId) => {
  data.forEach((comment) => {
    if (comment.id == commentId) {
      comment.upVoteCount += 1;
    }
  });
  return data;
};
