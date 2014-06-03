#version 430 core

// Entry Variables
smooth in highp vec2    texCoord;
uniform sampler2D   in_Texture;
uniform float   in_Brightness;
uniform vec3    in_Color;

// Exit Variables
out vec4    color;

void    main()
{
    vec4    lTex = texture2D(in_Texture, texCoord);
    float   lGreyScale = dot(lTex.rgb, vec3(0.3f, 0.59f, 0.11f));
    color = vec4(lGreyScale * in_Color * in_Brightness, lTex.a);
}
