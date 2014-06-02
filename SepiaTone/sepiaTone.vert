#version 430 core

in highp vec3 in_Vertex;
in highp vec2 in_TexCoord;

uniform highp mat4    in_Matrix;

smooth out highp vec2   texCoord;

void    main()
{
    texCoord = in_TexCoord;
    gl_Position = in_Matrix * vec4(in_Vertex, 1.0f);
}
