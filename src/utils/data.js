exports.shortenEmail = (email) => {
  if (email.length <= 8) {
    return email; // Return the email as is if its length is not more than 20 characters
  }

  const username = email.substring(0, 10); // Take the first 10 characters of the email username
  const domain = email.substring(email.indexOf("@")); // Take the domain part of the email

  return `${username}...${domain}`;
};
