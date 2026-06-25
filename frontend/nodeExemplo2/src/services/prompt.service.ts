export function buildNotesText(
  notes: any[]
) {
  return notes
    .map(
      (n) =>
        `${n.note_key}=${n.note_value}`
    )
    .join("\n");
}

export function buildMessages(
  persona: string,
  notesText: string,
  history: any[],
  currentMessage: string
) {
  return [
    {
      role: "system",
      content: `
${persona}

Known notes:

${notesText}
`,
    },

    ...history,

    {
      role: "user",
      content: currentMessage,
    },
  ];
}