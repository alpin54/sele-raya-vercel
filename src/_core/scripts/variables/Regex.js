/* ------------------------------------------------------------------------------
@name: Regex
@description: Regex
--------------------------------------------------------------------------------- */

export const WHITESPACE = /^ *$/;
export const EMAIL = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
export const NUMBERIC = /[0-9]+$/i;
export const PHONE_NUMBER = /^(?:0|\+62)\d{9,13}$/;
export const FULL_NAME = /^(?:[\u00c0-\u01ffa-zA-Z-\s\.']){3,}(?:[\u00c0-\u01ffa-zA-Z-\s\.']{3,})+$/i;
export const PERSON_NAME = /^[a-zA-Z][a-zA-Z\-' ]*[a-zA-Z ]$/i;
