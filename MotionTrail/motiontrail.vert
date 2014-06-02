#version 420
#extension GL_ARB_gpu_shader5 : enable

in highp vec3 in_Vertex;
in highp vec2 in_TexCoord;

uniform highp mat4 in_ProjMatrix;

smooth out highp vec2 texCoord;

void main(void)
{
    texCoord = in_TexCoord;
    gl_Position = in_ProjMatrix * vec4(in_Vertex, 1.0f);
}
