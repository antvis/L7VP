type Op = {
  insert?: string | Record<string, unknown>;
  attributes?: string | Record<string, unknown>;
};

export type RichTextEditingType = {
  ops?: Op[] | { ops: Op[] };
};
