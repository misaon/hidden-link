<template>
  <div class="flex flex-col gap-12">
    <section class="grid grid-cols-1 gap-12 lg:grid-cols-2">
      <div class="flex flex-col gap-8">
        <h1 class="text-5xl font-bold text-accent-content">{{ $t('header.title') }}</h1>
        <p>{{ $t('header.subtitle') }}</p>
      </div>

      <FormEncrypt />
    </section>

    <section id="why" class="flex flex-col gap-4">
      <h2 class="divider divider-start text-4xl font-bold">Why?</h2>
      <p>
        Nullam eget nisl. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
        doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et
        quasi architecto beatae vitae dicta sunt explicabo. Nunc tincidunt ante vitae massa. In
        laoreet, magna id viverra tincidunt, sem odio bibendum justo, vel imperdiet sapien wisi sed
        libero. Maecenas ipsum velit, consectetuer eu lobortis ut, dictum at dui. Maecenas aliquet
        accumsan leo. Maecenas ipsum velit, consectetuer eu lobortis ut, dictum at dui. Itaque earum
        rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias
        consequatur aut perferendis doloribus asperiores repellat. Duis condimentum augue id magna
        semper rutrum. In enim a arcu imperdiet malesuada. Nunc auctor. Nullam eget nisl. Fusce
        tellus odio, dapibus id fermentum quis, suscipit id erat. Morbi imperdiet, mauris ac auctor
        dictum, nisl ligula egestas nulla, et sollicitudin sem purus in lacus. Pellentesque ipsum.
        Etiam dui sem, fermentum vitae, sagittis id, malesuada in, quam. Nunc dapibus tortor vel mi
        dapibus sollicitudin. Nullam sapien sem, ornare ac, nonummy non, lobortis a enim. Aliquam
        erat volutpat. Fusce consectetuer risus a nunc.
      </p>
    </section>

    <section id="how-it-works" class="flex flex-col gap-4">
      <h2 class="divider divider-start text-4xl font-bold">How it works?</h2>
      <p>
        Nullam eget nisl. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
        doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et
        quasi architecto beatae vitae dicta sunt explicabo. Nunc tincidunt ante vitae massa. In
        laoreet, magna id viverra tincidunt, sem odio bibendum justo, vel imperdiet sapien wisi sed
        libero. Maecenas ipsum velit, consectetuer eu lobortis ut, dictum at dui. Maecenas aliquet
        accumsan leo. Maecenas ipsum velit, consectetuer eu lobortis ut, dictum at dui. Itaque earum
        rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias
        consequatur aut perferendis doloribus asperiores repellat. Duis condimentum augue id magna
        semper rutrum. In enim a arcu imperdiet malesuada. Nunc auctor. Nullam eget nisl. Fusce
        tellus odio, dapibus id fermentum quis, suscipit id erat. Morbi imperdiet, mauris ac auctor
        dictum, nisl ligula egestas nulla, et sollicitudin sem purus in lacus. Pellentesque ipsum.
        Etiam dui sem, fermentum vitae, sagittis id, malesuada in, quam. Nunc dapibus tortor vel mi
        dapibus sollicitudin. Nullam sapien sem, ornare ac, nonummy non, lobortis a enim. Aliquam
        erat volutpat. Fusce consectetuer risus a nunc.
      </p>
    </section>

    <section id="faq" class="flex flex-col gap-4">
      <h2 class="divider divider-start text-4xl font-bold">FAQ</h2>
      <p>
        Nullam eget nisl. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
        doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et
        quasi architecto beatae vitae dicta sunt explicabo. Nunc tincidunt ante vitae massa. In
        laoreet, magna id viverra tincidunt, sem odio bibendum justo, vel imperdiet sapien wisi sed
        libero. Maecenas ipsum velit, consectetuer eu lobortis ut, dictum at dui. Maecenas aliquet
        accumsan leo. Maecenas ipsum velit, consectetuer eu lobortis ut, dictum at dui. Itaque earum
        rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias
        consequatur aut perferendis doloribus asperiores repellat. Duis condimentum augue id magna
        semper rutrum. In enim a arcu imperdiet malesuada. Nunc auctor. Nullam eget nisl. Fusce
        tellus odio, dapibus id fermentum quis, suscipit id erat. Morbi imperdiet, mauris ac auctor
        dictum, nisl ligula egestas nulla, et sollicitudin sem purus in lacus. Pellentesque ipsum.
        Etiam dui sem, fermentum vitae, sagittis id, malesuada in, quam. Nunc dapibus tortor vel mi
        dapibus sollicitudin. Nullam sapien sem, ornare ac, nonummy non, lobortis a enim. Aliquam
        erat volutpat. Fusce consectetuer risus a nunc.
      </p>
    </section>
  </div>
</template>
