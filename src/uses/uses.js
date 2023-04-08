export function useLecturerFullName(lecturer) {
  return lecturer.last_name + ' ' + lecturer.first_name.charAt(0) + '. ' + lecturer.second_name.charAt(0) + '.'
}
