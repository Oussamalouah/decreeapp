export const weddingProductTypes = {
  INVITATION: 'invitation',
  SAVE_THE_DATE: 'save-the-date',
  RSVP: 'reply-card',
  THANK_YOU: 'thank-you',
  REHEARSAL: 'rehearsal',
  PACKAGE: 'packages',
};

export const printedTypes = {
  engraved: 'engraved',
  letterPress: 'letterPress',
};

export const weddingCategories = [
  {id: weddingProductTypes.INVITATION, text: 'Invitations'},
  {id: weddingProductTypes.SAVE_THE_DATE, text: 'Save The Dates'},
  {id: weddingProductTypes.RSVP, text: 'Reply Cards'},
  {id: weddingProductTypes.THANK_YOU, text: 'Thank You'},
  {id: weddingProductTypes.REHEARSAL, text: 'Rehearsal Dinner'},
  // {id: weddingProductTypes.PACKAGE, text: 'Wedding Collections'},
];

export const greetingCategories = [
  {id: 'birthday', text: 'Birthday'},
  {id: 'personal-thank-you', text: 'Thank You'},
  {id: 'congrats', text: 'Congrats'},
  {id: 'sympathy', text: 'Sympathy'},
  {id: 'baby-announcement', text: 'Baby Announcement'},
  {id: 'anniversary', text: 'Anniversary'},
];

export const businessCategories = [{id: 'business', text: 'Business'}];

export const bespokeCategories = [{id: 'bespoke', text: 'Bespoke'}];

export const holidayCategories = [
  {id: 'in-season-holiday', text: 'In Season Holiday'},
];

export const weddingTags = [
  {id: 'modern', text: 'Modern'},
  {id: 'luxury', text: 'Luxury'},
  {id: 'simple', text: 'Simple'},
  {id: 'funky', text: 'Funky'},
  {id: 'themed', text: 'Themed'},
  {id: 'elegant', text: 'Elegant'},
  {id: 'flowery', text: 'Flowery'},
  {id: 'bohemian', text: 'Bohemian'},
  {id: 'traditional', text: 'Traditional'},
];

const greetingHolidayTags = [
  {id: 'valentines', text: 'Valentines'},
  {id: 'mothers-day', text: "Mother's Day"},
  {id: 'fathers-day', text: "Father's Day"},
  {id: 'halloween', text: 'Halloween'},
  {id: 'thanksgiving', text: 'Thanksgiving'},
  // Comment out if these are moved out from 'in-season-holiday'
  // {id: 'new-years', text: 'New Years'},
  // {id: 'christmas', text: 'Christmas'},
];

// Separated these since they wont have the same tags
export const greetingTags = {
  holiday: greetingHolidayTags,
  birthday: [],
  'personal-thank-you': [],
  congrats: [],
  sympathy: [],
  'baby-announcement': [],
  anniversary: [],
};
