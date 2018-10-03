export const isAuthenticated = user => {
  if (user == null) {
    return false
  }
  return !!user
}

export const isAllowed = (user, rights) =>
  rights.some(right => user.rights.includes(right));
