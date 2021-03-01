const SUPREME_OVERLORD = ["broadcaster"];

/**
 * Compares the supplied badges with the required badges.
 * @public
 * @param {Object} curPerms  The badges object returned from the TMI
 * @param {Array} reqPerms The permissions array from the specified command
 * @returns {Boolean} True if the supplied badges have at least one required badge, false if it doesn't have any required badge
 */

module.exports = (curPerms, reqPerms) => {
  // if the command doesn't require any badges/permissions, we can return true and run the command
  if (!reqPerms || reqPerms.length == 0) return true;
  // put all keys from the TMI 'badges' object into an array
  const curPermsArray = curPerms == null ? [] : Object.keys(curPerms);
  // if the user has any permission which is exempt from permission handling, we can return true and run the command
  if (SUPREME_OVERLORD.some((perm) => curPermsArray.includes(perm)))
    return true;
  // otherwise, check if the user has any permissions specified in the command, true : false
  return reqPerms.some((perm) => curPermsArray.includes(perm));
};
