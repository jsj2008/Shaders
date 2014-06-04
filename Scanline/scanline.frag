#version 430 core

// Entry Variables
smooth in highp vec2    texCoord;
uniform sampler2D   in_Texture;
uniform int   in_Line;
uniform int   in_LineWidth;

// Exit Variables
out vec4    color;

// Def Function

void    main()
{
    int     lNumLine = int(gl_FragCoord.y) % in_Line;
    if (lNumLine < in_LineWidth)
        color = vec4(0.0f, 0.0f, 0.0f, 1.0f);
    else
        color = texture2D(in_Texture, texCoord);
}
