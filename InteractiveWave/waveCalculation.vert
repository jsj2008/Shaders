#version 420
#extension GL_ARB_gpu_shader5 : enable

// Entry
in highp vec4		in_Vertex;
in highp vec2		in_TexCoord;
uniform highp mat4	in_Matrix;
uniform vec2		in_Size;

// Exit
smooth out highp vec2	texCoord;
smooth out highp vec2	aroundTex[8];

void	main()
{
        texCoord = in_TexCoord;
        gl_Position = in_Matrix * in_Vertex;
        float	lDX = 1.0f / in_Size.x;
        float	lDY = 1.0f / in_Size.y;
        aroundTex[0] = vec2(texCoord.x - lDX, texCoord.y - lDY);
        aroundTex[1] = vec2(texCoord.x, texCoord.y - lDY);
        aroundTex[2] = vec2(texCoord.x + lDX, texCoord.y - lDY);
        aroundTex[3] = vec2(texCoord.x - lDX, texCoord.y);
        aroundTex[4] = vec2(texCoord.x + lDX, texCoord.y);
        aroundTex[5] = vec2(texCoord.x - lDX, texCoord.y + lDY);
        aroundTex[6] = vec2(texCoord.x, texCoord.y + lDY);
        aroundTex[7] = vec2(texCoord.x + lDX, texCoord.y + lDY);
}
