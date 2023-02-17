
export const messages = {
    accepted: () => "The :attribute must be accepted.",
    accepted_if: () => "The :attribute must be accepted when :other is :value.",
    // active_url: ({ value }) => {
      //This cannot be supported because JS does not support hostname lookups (dns_get_record in PHP)
      //This could be implemented if there was a reliable way to host a small API to do the lookup
    // },
    after: () => "The :attribute must be after :date.",
    after_or_equal: () => "The :attribute must be after or equal to :date.",

    alpha: () => "The :attribute may only contain letters.",
    alpha_dash: () => "The :attribute may only contain letters, numbers, dashes and underscores.", // I don't think that's what this rule does
    alpha_num: () => "The :attribute may only contain letters and numbers.",

    array: () => "The :attribute must be an array.",

    //bail: is on by default but is `validateForm` call

    before: () => "The :attribute must be before :date.",
    before_or_equal: () => "The :attribute must be before or equal to :date.",

    between: () => "The :attribute must be between :min and :max",  // TODO this one is more complicated

    boolean: () => "The :attribute field must be true or false.",

    confirmed: () => "The :attribute confirmation does not match.",
    
    date: () => "The :attribute is not a valid date.",
    date_equals: () => "The :attribute must be a date equal to :date.",
    date_format: () => "The :attribute does not match the format :format.",

    declined: () => "You must decline :attribute.",
    declined_if: () => "You must decline :attribute if :other is :value.",

    different: () => "The :attribute and :other must be different.",

    digits: () => "The :attribute must be :digits digits.",
    digits_between: () => "The :attribute must be between :min and :max digits.",

    dimensions: () => "The :attribute has invalid image dimensions.",

    distinct: () => "The :attribute field has a duplicate value.",

    email: () => "The :attribute must be a valid email address.",

    file: () => "The :attribute must be a file.",

    filled: () => "The :attribute field must have a value.",

    gt: () => "The :attribute must be greater than :value.", // TODO this one is more complicated
    gte: () => "The attribute must be greater than or equal to :value.", // TODO this one is more complicated

    image: () => "The :attribute must be an image.",

    in: () => "The selected :attribute is invalid.",
    in_array: () => "The :attribute field does not exist in :other.",
    
    integer: () => "The :attribute must be an integer.",

    ip: () => "The :attribute must be a valid IP address.",
    ipv4: () => "The :attribute must be a valid IPv4 address.",
    ipv6: () => "The :attribute must be a valid IPv6 address.",

    json: () => "The :attribute must be a valid JSON string.",

    lt: () => "The :attribute must be less than :value.", // TODO this is more complicated, and is it done with size?
    lte: () => "The :attribute must be less than or equal to :value.", // TODO this is more complicated, and is it done with size?

    mac_access: () => "Invalid MAC address.",

    max: () => "", // TODO this is more complicated, and is it done with size?

    multiple_of: () => "The :attribute must be a multiple of :value.",

    // mimes?
    // mimetypes?

    min: () => "", // TODO this is more complicated, and is it done with size?

    not_in: () => "The selected :attribute is invalid.",

    //not_regex

    //nullable: implemented in `validateField` method (index.js)

    numeric: () => "The :attribute must be a valid number.",

    present: () => "The :attribute field must be present.",

    regex: () => "The :attribute is not a valid regular expression.",

    required: () => "The :attribute field is required.",
    required_if: () => "The :attribute field is required when :other is :value.",
    required_unless: () => "The :attribute field is required unless :other is in :values.",
    required_with: () => "The :attribute field is required when :values is present.",
    required_with_all: () => "The :attribute field is required when :values are present.",
    required_without: () => "The :attribute field is required when :values is not present.",
    required_if_multiple: () => "The :attribute field is required when :values is present.",
    required_without_all: () => "The :attribute field is required when none of :values are present.",

    same: () => "The :attribute and :other must match.",

    size: () => "", // TODO this is more complicated
    
    // TODO starts_with

    string: () => "The :attribute must be a string.",

    timezone: () => "The :attribute must be a valid zone.",

    // TODO unique

    url: () => "The :attribute format is invalid.",

    uuid: () => "The :attribute must be a valid UUID.",
};

const backupMessages = Object.assign({}, messages);

//export default messages;

function getCurrentMessageHandlers() {
    return messages;
}

function revertMessageHandlers() {
    Object.assign(messages, backupMessages)
}

function setMessageHandlers(newMessages) {
    Object.assign(messages, newMessages);
}

function setMessageHandler(rule, createMessage) {
    setMessageHandlers({
      [rule]: createMessage
    });
}

function getMessage(rule, fieldData) {
    if (messages[rule] === undefined) {
        return "";
    }
    return messages[rule](fieldData);
}

function getMessageHandler(rule) {
    return messages[rule];
}

export {
    setMessageHandlers,
    setMessageHandler,
    getMessage,
    getMessageHandler,
    revertMessageHandlers,
    getCurrentMessageHandlers
}