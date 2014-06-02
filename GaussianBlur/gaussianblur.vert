#version 420
#extension GL_ARB_gpu_shader5 : enable
#define KERNEL 10

// Entry
in highp vec4		in_Vertex;
in highp vec2		in_TexCoord;
uniform highp mat4	in_Matrix;
uniform int		in_type;
uniform vec2		in_size;

// Exit
smooth out highp vec2	texCoord;
smooth out highp vec2	offsetP[KERNEL];
smooth out highp vec2	offsetN[KERNEL];

// Function def
void	HBlur();
void	VBlur();


void	main()
{
    texCoord = in_TexCoord;
    gl_Position = in_Matrix * in_Vertex;
    if (in_type == 1)
        HBlur();
    else
        VBlur();
}

void	HBlur()
{
    float	lDX = 1.0f / in_size.x;
    for (int i = 1; i < KERNEL; i += 1)
    {
        float	x = lDX * i;
        offsetP[i] = vec2(texCoord.x + x, texCoord.y);
        offsetN[i] = vec2(texCoord.x - x, texCoord.y);
    }
}

void	VBlur()
{
    float	lDY = 1.0f / in_size.y;
    for (int i = 1; i < KERNEL; i += 1)
    {
        float	y = lDY * i;
        offsetP[i] = vec2(texCoord.x, texCoord.y + y);
        offsetN[i] = vec2(texCoord.x, texCoord.y - y);
    }
}
