const generateUniqueId = async (existingIds) => {
  let id;
  do {
    // Generate a random number (you can adjust the range as needed)
    id = Math.floor(Math.random() * 1000000);
  } while (existingIds.includes(id)); // Ensure the ID is unique
  return id;
};

module.exports = generateUniqueId;
