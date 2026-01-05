export const foldersByUserQuery = /* GraphQL */ `
  query FoldersByUser($userId: ID!) {
    foldersByUser(userId: $userId) {
      id
      name
      parentId
    }
  }
`;

export default foldersByUserQuery;


