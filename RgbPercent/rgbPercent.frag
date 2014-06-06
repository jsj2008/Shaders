#version 430 core

// Entry Variables
smooth in highp vec2    texCoord;
uniform sampler2D   in_Texture;
uniform vec3    in_RedComp;
uniform vec3    in_GreenComp;
uniform vec3    in_BlueComp;

// Exit Variables
out vec4    color;

void    main()
{
    vec4    lColor = texture(in_Texture, texCoord);
    float   lRedComp = (lColor.r * in_RedComp.r + lColor.g * in_RedComp.g + lColor.b * in_RedComp.b) / max(1.0f, (in_RedComp.r + in_RedComp.g + in_RedComp.b));
    float   lGreenComp = (lColor.r * in_GreenComp.r + lColor.g * in_GreenComp.g + lColor.b * in_GreenComp.b) / max(1.0f, (in_GreenComp.r + in_GreenComp.g + in_GreenComp.b));
    float   lBlueComp = (lColor.r * in_BlueComp.r + lColor.g * in_BlueComp.g + lColor.b * in_BlueComp.b) / max(1.0f, (in_BlueComp.r + in_BlueComp.g + in_BlueComp.b));
    color = vec4(lRedComp, lGreenComp, lBlueComp, lColor.a);
}
