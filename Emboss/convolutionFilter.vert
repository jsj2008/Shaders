#version 430 core

in highp vec3 in_Vertex;
in highp vec2 in_TexCoord;

uniform highp mat4  in_Matrix;
uniform vec2        in_ScreenSize;

smooth out highp vec2   texCoord[9];

void    main()
{
    highp vec2  lOffset = 1.0f / in_ScreenSize;
    texCoord[0] = in_TexCoord - lOffset;
    texCoord[1] = in_TexCoord + vec2(0.0f, -lOffset.t);
    texCoord[2] = in_TexCoord + vec2(lOffset.s, -lOffset.t);
    texCoord[3] = in_TexCoord + vec2(-lOffset.s, 0.0f);
    texCoord[4] = in_TexCoord;
    texCoord[5] = in_TexCoord + vec2(lOffset.s, 0.0f);
    texCoord[6] = in_TexCoord + vec2(-lOffset.s, lOffset.t);
    texCoord[7] = in_TexCoord + vec2(0.0f, lOffset.t);
    texCoord[8] = in_TexCoord + lOffset;
    gl_Position = in_Matrix * vec4(in_Vertex, 1.0f);
}
