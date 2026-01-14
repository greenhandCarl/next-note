export const createFolder = /* GraphQL */ `
  mutation CreateFolder($userId: ID!, $name: String!) {
    createFolder(userId: $userId, name: $name) {
      id
      parentId
    }
  }
`;

export default createFolder;
