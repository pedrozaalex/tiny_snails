import {string} from "yup";

export default function containsBaseUrl(url?: string | null) {
  return (
    /tny-snls.xyz\/s\/\w+/.test(url ?? '') ||
    /tny-snls.xyz\/s\/\w+/.test(decodeURI(url ?? ''))
  );
};

const containsSlur = (alias?: string | null) => {
  return RegExp('(fag(g|got|tard)?\b|cock\s?sucker(s|ing)?|ni((g{2,}|q)+|[gq]{2,})[e3r]+(s|z)?|mudslime?s?|kikes?|\bspi(c|k)s?\b|\bchinks?|gooks?|bitch(es|ing|y)?|whor(es?|ing)|\btr(a|@)nn?(y|ies?)|\b(b|re|r)tard(ed)?s?)').test(alias ?? '')
}

export const urlValidator = string().trim().url().required().nullable().test('base url', "you can't create a recursive url, you cheeky bastard", url => !containsBaseUrl(url))
export const snailOwnerValidator = string().trim().nullable();
export const aliasValidator = string().trim().matches(/[\w-]/i).nullable().min(3).max(20).test('slur', "don't use slurs", alias => !containsSlur(alias))
