type Op = {
  insert?: string | Record<string, any>;
  attributes?: Record<string, any>;
};

export type RichTextEditingDelta = {
  ops?:
    | Op[]
    | {
        ops: Op[];
      };
};
