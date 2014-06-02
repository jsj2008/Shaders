#version 430 core

// Entry Variables
smooth in highp vec2    texCoord;
uniform sampler2D   in_Texture;
uniform float   in_TonageExp;

// Exit Variables
out vec4    color;

void    main()
{
    vec4    lTex = texture2D(in_Texture, texCoord);
    float   lGreyScale = dot(lTex.rgb, vec3(0.3f, 0.59f, 0.11f));
    color = vec4(lGreyScale * vec3(0.9f, 0.8f, 0.6f) * in_TonageExp, lTex.a);
}
