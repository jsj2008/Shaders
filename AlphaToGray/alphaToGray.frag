#version 430 core

// Entry Variables
smooth in highp vec2    texCoord;
uniform sampler2D   in_Texture;

// Exit Variables
out vec4    color;

void    main()
{
    color = vec4(vec3(texture(in_Texture, texCoord).a), 1.0f);
}
