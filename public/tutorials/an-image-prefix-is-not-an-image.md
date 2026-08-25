# An image prefix is not an image

A browser inspection returned JSON containing a shortened image data URL. The
image formatter matched the base64-looking prefix, decoding failed inside
`after_tools`, and an otherwise successful agent run ended.

Catching one padding exception was not enough: truncated payloads can have
valid padding, while arbitrary text can use only base64 characters. The
formatter now requires strict decoding plus the declared PNG, JPEG, GIF, or
WebP signature and complete terminal structure. Invalid candidates remain
ordinary tool text. Genuine images still upload, and genuine upload failures
still fail loudly.

The regression uses the exact production prefix from issue #1269 and a payload
that decodes but is not an image. Complete images still pass the unit and plugin
end-to-end paths.
